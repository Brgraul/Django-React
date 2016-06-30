# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-30 08:22
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Creado')),
                ('updated', models.DateTimeField(auto_now=True, verbose_name='Actualizado')),
                ('date_booking', models.DateTimeField(verbose_name='Fecha de la Consulta')),
                ('adress', models.CharField(max_length=500, verbose_name='Direccion')),
                ('city', models.CharField(max_length=100, verbose_name='Ciudad')),
            ],
            options={
                'verbose_name_plural': 'Reservas',
            },
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Creado')),
                ('first_name', models.CharField(blank=True, max_length=100, null=True, verbose_name='Nombre')),
                ('last_name', models.CharField(blank=True, max_length=100, null=True, verbose_name='Apellidos')),
                ('city', models.CharField(blank=True, max_length=100, null=True, verbose_name='Ciudad')),
                ('adress', models.CharField(blank=True, max_length=100, null=True, verbose_name='Direccion')),
                ('phone_number', models.CharField(blank=True, max_length=100, null=True, verbose_name='Telefono')),
            ],
            options={
                'verbose_name': 'Cliente',
                'verbose_name_plural': 'Clientes',
            },
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('auth_code', models.CharField(blank=True, max_length=100, null=True, verbose_name='Authorization Code')),
                ('ref_code', models.CharField(blank=True, max_length=100, verbose_name='Codigo de referencia')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Creado')),
                ('status', models.CharField(blank=True, choices=[('pagado', 'Pagado'), ('pendiente', 'Pendiente'), ('fallo_en_el_pago', 'Error de Pago')], max_length=20, null=True, verbose_name='Estatus del pedido')),
                ('booking', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_booking.Booking', verbose_name='Reserva Relacionada')),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_booking.Customer', verbose_name='Cliente')),
            ],
            options={
                'verbose_name': 'Pedido',
                'verbose_name_plural': 'Pedidos',
            },
        ),
        migrations.CreateModel(
            name='Pet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Nombre')),
                ('species', models.CharField(max_length=100, verbose_name='Especie')),
                ('breed', models.CharField(max_length=100, verbose_name='Raza')),
                ('conditions', models.TextField(max_length=5000, verbose_name='Razon de la consulta')),
                ('birthday', models.DateField(blank=True, null=True, verbose_name='Fecha de Nacimiento')),
                ('gender', models.CharField(blank=True, choices=[('hembra_normal', 'Hembra Normal'), ('hembra_esterilizada', 'Hembra Esterilizada'), ('macho_normal', 'Macho Normal'), ('macho_esterilizado', 'Macho Esterilizado')], max_length=20, null=True, verbose_name='Sexo')),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_booking.Customer', verbose_name='Cliente')),
            ],
            options={
                'verbose_name_plural': 'Mascotas',
            },
        ),
        migrations.AddField(
            model_name='booking',
            name='customer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_booking.Customer', verbose_name='Cliente'),
        ),
    ]